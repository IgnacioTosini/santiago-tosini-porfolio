import { NextResponse } from 'next/server';

type TiktokAuthCodeTokenResponse = {
    data?: {
        access_token?: string;
        refresh_token?: string;
        open_id?: string;
        scope?: string;
        expires_in?: number;
        refresh_expires_in?: number;
        token_type?: string;
    };
    error?: {
        code?: string;
        message?: string;
        log_id?: string;
    };
};

const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    if (error) {
        return NextResponse.json(
            {
                success: false,
                message: 'TikTok devolvio un error en la autorizacion.',
                error,
                errorDescription,
                state,
            },
            { status: 400 },
        );
    }

    if (!code) {
        return NextResponse.json(
            {
                success: false,
                message: 'Callback recibido sin code. Revisa el Redirect URI en TikTok Login Kit.',
                state,
            },
            { status: 400 },
        );
    }

    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

    if (!clientKey || !clientSecret) {
        return NextResponse.json(
            {
                success: false,
                message: 'Faltan TIKTOK_CLIENT_KEY o TIKTOK_CLIENT_SECRET en variables de entorno.',
                receivedCode: code,
                state,
            },
            { status: 500 },
        );
    }

    const redirectUri = `${url.origin}${url.pathname}`;
    const body = new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
    });

    try {
        const tokenResponse = await fetch(TIKTOK_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
            cache: 'no-store',
        });

        const rawText = await tokenResponse.text();
        let parsed: TiktokAuthCodeTokenResponse | null = null;

        try {
            parsed = JSON.parse(rawText) as TiktokAuthCodeTokenResponse;
        } catch {
            parsed = null;
        }

        if (!tokenResponse.ok || !parsed || (parsed.error?.code && parsed.error.code !== 'ok')) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No se pudo intercambiar el code por tokens.',
                    status: tokenResponse.status,
                    redirectUri,
                    state,
                    rawResponse: parsed ?? rawText,
                },
                { status: 500 },
            );
        }

        const accessToken = parsed.data?.access_token;
        const refreshToken = parsed.data?.refresh_token;

        if (!accessToken) {
            return NextResponse.json({
                success: false,
                message: 'TikTok respondio OK pero no devolvio access_token. Revisa la respuesta completa.',
                redirectUri,
                state,
                rawTiktokResponse: parsed,
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: refreshToken
                ? 'Autorizacion TikTok completada. Copia REFRESH_TOKEN a .env.local'
                : 'Autorizacion TikTok completada. Solo se recibio access_token (sin refresh_token). Copia ACCESS_TOKEN temporalmente.',
            redirectUri,
            state,
            accessToken,
            refreshToken: refreshToken ?? null,
            expiresIn: parsed.data?.expires_in,
            refreshExpiresIn: parsed.data?.refresh_expires_in,
            scope: parsed.data?.scope,
            openId: parsed.data?.open_id,
            rawTiktokResponse: parsed,
        });
    } catch (exchangeError) {
        return NextResponse.json(
            {
                success: false,
                message: exchangeError instanceof Error ? exchangeError.message : 'Error desconocido al pedir tokens a TikTok.',
                redirectUri,
                state,
            },
            { status: 500 },
        );
    }
}

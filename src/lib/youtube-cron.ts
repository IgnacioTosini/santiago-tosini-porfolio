import cron from 'node-cron';
import { getYoutubeChannelData, cacheYoutubeData } from './youtube.service';

let cronJob: cron.ScheduledTask | null = null;

/**
 * Initialize YouTube data sync cron job
 * Runs every day at 8 AM and 8 PM (UTC-3 Argentina timezone)
 */
export function initYoutubeCron() {
    if (cronJob) {
        console.log('YouTube cron job already running');
        return;
    }

    // Schedule: 0 8,20 * * * (8 AM & 8 PM daily)
    // For testing: change to '*/5 * * * *' for every 5 minutes
    const schedule = process.env.YOUTUBE_SYNC_CRON || '0 8,20 * * *';
    const timezone = process.env.YOUTUBE_SYNC_TIMEZONE || 'America/Argentina/Buenos_Aires';

    try {
        cronJob = cron.schedule(schedule, async () => {
            console.log(
                `[${new Date().toISOString()}] Starting YouTube data sync...`
            );

            try {
                const youtubeData = await getYoutubeChannelData();
                await cacheYoutubeData(youtubeData);

                console.log(
                    `[${new Date().toISOString()}] ✅ YouTube data synced successfully`
                );
                console.log(
                    `   Subscribers: ${youtubeData.metrics.subscriberCount.toLocaleString()}`
                );
                console.log(
                    `   Total Views: ${youtubeData.metrics.viewCount.toLocaleString()}`
                );
                console.log(`   Recent Videos: ${youtubeData.recentVideos.length}`);
            } catch (error) {
                console.error(
                    `[${new Date().toISOString()}] ❌ YouTube sync failed:`,
                    error instanceof Error ? error.message : error
                );
            }
        }, { timezone });

        console.log(`✅ YouTube cron job initialized (Schedule: ${schedule}, Timezone: ${timezone})`);
    } catch (error) {
        console.error('Failed to initialize YouTube cron:', error);
    }
}

/**
 * Stop the cron job
 */
export function stopYoutubeCron() {
    if (cronJob) {
        cronJob.stop();
        cronJob = null;
        console.log('YouTube cron job stopped');
    }
}

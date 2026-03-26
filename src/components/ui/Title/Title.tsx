import './_title.scss'

interface Props {
    title: string;
    span: string;
}

export const Title = ({ title, span }: Props) => {
    return (
        <div className="title">
            <h1>{title}<span>{span}</span></h1>
        </div>
    )
}

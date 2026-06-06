type CalorieDisplayProps = {
    calories: number;
    text: string;
}

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <span className="font-black text-6xl text-white">{calories}</span>
            <p className="text-white/70 uppercase font-bold text-sm tracking-widest">{text}</p>
        </div>
    )
}
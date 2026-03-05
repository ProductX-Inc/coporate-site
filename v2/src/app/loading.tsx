export default function Loading() {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
                {/* Animated logo pulse */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)] animate-pulse" />
                    <div className="absolute inset-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)] animate-ping opacity-20" />
                </div>

                {/* Skeleton lines */}
                <div className="flex flex-col items-center gap-2">
                    <div className="h-2 w-32 rounded-full bg-muted animate-pulse" />
                    <div className="h-2 w-20 rounded-full bg-muted animate-pulse delay-75" />
                </div>
            </div>
        </div>
    );
}

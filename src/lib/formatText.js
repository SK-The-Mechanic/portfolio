export function renderFormattedText(text) {
    if (!text) return null;

    const blocks = text.trim().split(/\n\s*\n/);

    return blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isBulletBlock = lines.length > 0 && lines.every((l) => /^[-*•]\s+/.test(l));

        if (isBulletBlock) {
            return (
                <ul key={i} className="description-list">
                    {lines.map((l, j) => (
                        <li key={j}>{l.replace(/^[-*•]\s+/, "")}</li>
                    ))}
                </ul>
            );
        }

        return (
            <p key={i} className="description-para">
                {lines.map((l, j) => (
                    <span key={j}>
                        {l}
                        {j < lines.length - 1 && <br />}
                    </span>
                ))}
            </p>
        );
    });
}
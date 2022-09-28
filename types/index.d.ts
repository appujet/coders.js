declare class Markdown {
    constructor();
    private string: MarkdownString;
    public formet(text: String, type: formetType, color: colorTypeString, backgroundColor: backgroundColorTypeString, newLine: Boolean): String
    public toCodeblock(): MarkdownString;
}
declare type colorTypeString = 'GRAY' | 'RED' | 'GREEN' | 'YELLOW' | 'BLUE' | 'PINK' | 'CYAN' | 'WHITE';
declare type backgroundColorTypeString = 'DARKBLUE' | 'ORANGE' | 'GRAY' | 'LIGHTGRAY' | 'INDIGO' | 'WHITE';
declare type formetType = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'STRIKETHROUGH' | 'BOTH';

export = Markdown;

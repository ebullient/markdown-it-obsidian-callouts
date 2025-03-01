export interface MdItObsidianCalloutsOptions {
    /**
     * CSS language prefix for fenced blocks.
     * Can be useful for external highlighters.
     */
    langPrefix?: string | "";

    /**
     * Custom icons for each marker. The key is the marker name, and the value is the html script represent the icon.
     * The key is always lowercase.
     *
     * @default inline svg icons from Obsidian (lucide) or the note icon if not found
     */
    icons?: Record<string, string>;
}

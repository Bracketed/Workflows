/**
 * Convert a string to a markdown-compatible anchor ID
 * Follows GitHub's markdown anchor ID generation rules:
 * - Lowercase the string
 * - Replace spaces with hyphens
 * - Remove special characters except hyphens
 * - Remove leading/trailing hyphens
 */
export function toAnchorId(text: string): string {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/[^\w-]+/g, '-') // Replace special chars with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

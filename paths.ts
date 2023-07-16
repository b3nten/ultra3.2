import {
	basename,
  dirname,
  extname,
  fromFileUrl,
  join,
  relative,
  resolve,
  toFileUrl,
	slash
} from "./deps.ts"

export const COMPILER_PREFIX = "🛠️";

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function isFileUrl(url: string): boolean {
	return url.startsWith("file://");
}

export function emojiToUri(emoji: string): string {
  return encodeURIComponent(emoji);
}

export function uriToEmoji(uri: string): string {
	return decodeURIComponent(uri);
}


export function getThisFile(): string {
	return fromFileUrl(import.meta.url);
}

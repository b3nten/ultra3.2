import { init } from "https://deno.land/x/deno_graph/mod.ts";
import Ultra from "./ultra.ts";

export default abstract class UltraPlugin {
	async build?(ultra: Ultra){}
	async serve?(ultra: Ultra){}
}
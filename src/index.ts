/**
 * A rollup plugin to keep the header comments from source in the declaration file
 * @packageDocumentation
 */
import type {OutputPlugin, SourceMapInput,} from "rollup" ;
import MagicString from "magic-string" ;

/**
 * Put the first multi-line comment at the start of the output chunk before the import statements,
 * if pattern is provided, find the first comment that matches the pattern.
 *
 * @public
 * @param options- Options to configure plugin
 * @example Config rollup
 * ```js
 * import clear from "rollup-plugin-clear";
 * import json from "@rollup/plugin-json";
 * import nodeResolve from "@rollup/plugin-node-resolve";
 * import commonjs from "@rollup/plugin-commonjs";
 * import typescript from "rollup-plugin-typescript2";
 * import dts from "rollup-plugin-dts";
 * import keepHeaderComment from "rollup-plugin-keep-header-comment";
 *
 * export default {
 *   plugins: [
 *     clear({targets: ["dist"]}),
 *     json(),
 *     nodeResolve({preferBuiltins: false}),
 *     commonjs(),
 *     typescript({tsconfig}),
 *     dts({tsconfig}),
 *     keepHeaderComment({
 *         sourcemap: true,
 *         pattern: /@packageDocumentation/
 *     })
 *   ]
 * }
 * ```
 */
export default function keepHeaderComment(options: {
    sourcemap?: boolean,
    pattern?: RegExp,
} = {
    sourcemap: true,
}): OutputPlugin {
    return {
        name: "keepHeaderComment",
        renderChunk(code: string): { code: string, map?: SourceMapInput } {
            const magicString = new MagicString(code) ;
            const pattern = /\/\*(\s|.)*?\*\//g ;
            let match ;
            while ((match = pattern.exec(code)) !== null) {
                // find the first comment match the pattern
                if (options.pattern?.test(match[0]) === false) {
                    continue ;
                }
                let header = match[0] ;
                const headerIndex = match.index ;
                let headerExtent = headerIndex + header.length ;
                const remaining = code.slice(headerExtent) ;
                if (remaining.startsWith("\n")) {
                    header += "\n" ;
                    headerExtent += 1 ;
                }

                magicString.overwrite(headerIndex, headerExtent, "") ;
                magicString.prepend(header) ;
                break ;
            }

            return {
                code: magicString.toString(),
                map: options.sourcemap !== undefined && options.sourcemap ? magicString.generateMap(
                    {hires: true,}) : undefined,
            } ;
        },
    } ;
}

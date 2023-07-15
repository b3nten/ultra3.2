import vendorImportMap from "./vendorImportMap.ts"



const importMap = {
	imports: {
		"react": "https://cdn.skypack.dev/react",
		"react2": "https://esm.sh/react",
	},
}

console.log(await vendorImportMap(importMap, "./.ultra/vendor"))
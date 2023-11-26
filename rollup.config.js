import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config();

const extensions = [".ts", ".js"];

const preventTreeShakingPlugin = () => {
  return {
    name: "no-treeshaking",
    resolveId(id, importer) {
      if (!importer) {
        // let's not treeshake entry points, as we're not exporting anything in App Scripts
        return { id, moduleSideEffects: "no-treeshake" };
      }
      return null;
    },
  };
};

export default {
  input: "./src/index.ts",
  output: {
    dir: "build",
    format: "cjs",
  },
  plugins: [
    preventTreeShakingPlugin(),
    nodeResolve({
      extensions,
      mainFields: ["jsnext:main", "main"],
    }),
    babel({ extensions, babelHelpers: "runtime" }),
    replace({
      values: {
        __TELEGRAM_TOKEN__: process.env.TELEGRAM_TOKEN,
        __TELEGRAM_USER_ID__: process.env.TELEGRAM_USER_ID,
        __DEPLOY_ID__: process.env.npm_package_appscript_deploy_id,
      },
      preventAssignment: true,
    }),
  ],
};

/**
 * tsup will inline `name`, `version` from {@link file://./../package.json} in
 * the bundle so that the file will not be required at runtime.
 */
import { name, version } from "../package.json";

const PLUGIN_NAME = name;
const PLUGIN_NAMESPACE = "z";
const PLUGIN_VERSION = version;
const PLUGIN_REPOSITORY_URL = "https://github.com/jeremy-code/eslint-plugin-z";

export { PLUGIN_NAME, PLUGIN_NAMESPACE, PLUGIN_VERSION, PLUGIN_REPOSITORY_URL };

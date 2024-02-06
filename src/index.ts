import * as core from "@actions/core";
import { context } from "@actions/github";

async function run() {
    try {
        if (context.eventName !== "release" && ontext.eventName !== "push") {
            core.setFailed(`Cannot execute release action in event '${context.eventName}'.`);
            return;
        }

        const event = context.payload[context.eventName] || {};
        let tag = event.tag_name || '';
        if (tag.length < 5) {
            core.setFailed(`Invalid release tag. Expecting either 'v1.2.3' or '1.2.3' or 'v1.2.3-preview' but got '${tag}'.`);
            return;
        }

        if (tag.startsWith("v")) {
            tag = tag.substring(1);
        }

        core.info(`Version: ${tag}`);
        core.setOutput("version", tag);
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

run();

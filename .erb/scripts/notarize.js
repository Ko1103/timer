const path = require('path');
const fs = require('fs');
const { notarize } = require('@electron/notarize');
const { build } = require('../../package.json');

const repoRoot = path.resolve(__dirname, '../..');
const defaultApiKeyFile = 'AuthKey_74TRB268BB.p8';

const resolveValue = (value, placeholder) => {
  if (!value) return placeholder;
  if (value.trim() === '') return placeholder;
  return value;
};

const APPLE_KEY_ID = resolveValue(process.env.APPLE_KEY_ID, '74TRB268BB');
const APPLE_KEY_ISSUER = resolveValue(
  process.env.APPLE_KEY_ISSUER,
  '<SET_APPLE_KEY_ISSUER>',
);
const APPLE_TEAM_ID = resolveValue(
  process.env.APPLE_TEAM_ID,
  '<SET_APPLE_TEAM_ID>',
);
const APPLE_KEY_PATH = resolveValue(
  process.env.APPLE_KEY_PATH,
  path.join(repoRoot, defaultApiKeyFile),
);

const isPlaceholder = (value) => value.startsWith('<SET_');

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const apiKeyPathExists = fs.existsSync(APPLE_KEY_PATH);
  const hasApiKeyCreds =
    APPLE_KEY_ID &&
    APPLE_KEY_ISSUER &&
    APPLE_TEAM_ID &&
    APPLE_KEY_PATH &&
    !isPlaceholder(APPLE_KEY_ISSUER) &&
    !isPlaceholder(APPLE_TEAM_ID) &&
    apiKeyPathExists;

  const appName = context.packager.appInfo.productFilename;

  const baseOptions = {
    tool: 'notarytool',
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
  };

  if (hasApiKeyCreds) {
    await notarize({
      ...baseOptions,
      appleApiKeyId: APPLE_KEY_ID,
      appleApiIssuer: APPLE_KEY_ISSUER,
      appleApiKey: APPLE_KEY_PATH,
      teamId: APPLE_TEAM_ID,
    });
    return;
  }

  console.warn(
    'Skipping notarizing step. Provide a valid App Store Connect API key (.p8) and set APPLE_TEAM_ID/APPLE_KEY_ISSUER.',
  );
};

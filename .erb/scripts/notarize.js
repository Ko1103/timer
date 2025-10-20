const { notarize } = require('@electron/notarize');
const { build } = require('../../package.json');

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  if (process.env.CI !== 'true') {
    console.warn('Skipping notarizing step. Packaging is not running in CI');
    return;
  }

  const hasNotaryAccountCreds =
    'APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env;
  const hasApiKeyCreds =
    'APPLE_APP_SPECIFIC_PASSWORD' in process.env &&
    'APPLE_TEAM_ID' in process.env &&
    'APPLE_KEY_ID' in process.env &&
    'APPLE_KEY_ISSUER' in process.env &&
    'APPLE_KEY_PATH' in process.env;

  if (!hasNotaryAccountCreds && !hasApiKeyCreds) {
    console.warn(
      'Skipping notarizing step. Provide either Apple ID creds (APPLE_ID, APPLE_ID_PASS, APPLE_TEAM_ID) or App Store Connect API key creds (APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_KEY_ISSUER, APPLE_KEY_PATH).',
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  const baseOptions = {
    tool: 'notarytool',
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
  };

  if (hasApiKeyCreds) {
    await notarize({
      ...baseOptions,
      appleApiKeyId: process.env.APPLE_KEY_ID,
      appleApiIssuer: process.env.APPLE_KEY_ISSUER,
      appleApiKey: process.env.APPLE_KEY_PATH,
      teamId: process.env.APPLE_TEAM_ID,
    });
    return;
  }

  await notarize({
    ...baseOptions,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
    teamId: process.env.APPLE_TEAM_ID,
  });
};

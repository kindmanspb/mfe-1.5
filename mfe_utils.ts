import type { container } from '@rspack/core';
import type { Configuration as RSpackConfiguration } from '@rspack/core';

interface RSpackConfigurationBuilderArguments {
  mode: 'development' | 'production';
}
export type RSpackConfigurationBuilder = (
  env: RSpackConfigurationBuilderArguments
) => RSpackConfiguration;

const shared = {
  react: { shareKey: 'react', requiredVersion: '18.2.0', singleton: true },
  'react-dom': {
    shareKey: 'react-dom',
    requiredVersion: '18.2.0',
    singleton: true,
  },
  antd: {
    shareKey: 'antd',
    requiredVersion: '5.13.2',
    singleton: false,
  },
  'antd-4': {
    shareKey: 'antd',
    requiredVersion: '^4.0.0',
    singleton: false,
  },
};

type MFOptions = ConstructorParameters<
  typeof container.ModuleFederationPlugin
>[0];

export const moduleFederationConfig: MFOptions = {
  name: 'app_demo',
  filename: `remoteEntry.js?v=[contenthash]`,
  shared,
};

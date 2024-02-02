import { container, HtmlRspackPlugin } from '@rspack/core';
import { moduleFederationConfig, RSpackConfigurationBuilder, } from './mfe_utils';

const {ModuleFederationPlugin, ModuleFederationPluginV1} = container;

const configurationBuilder: RSpackConfigurationBuilder = () => {
    const getPlugins = () => {
        return [
            ...[process.env.MF_VERSION === "1.5" ? new ModuleFederationPlugin(moduleFederationConfig) : new ModuleFederationPluginV1(moduleFederationConfig)],
            new HtmlRspackPlugin({
                template: './public/index.html',
            }),
        ];
    };

    return {
        entry: {
            main: './src/index.ts',
        },
        output: {
            filename: 'static/js/[name].[contenthash].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    type: 'javascript/auto',
                    exclude: [/[\\/]node_modules[\\/]/],
                    use: [
                        {
                            loader: 'builtin:swc-loader',
                            options: {
                                sourceMap: true,
                                jsc: {
                                    parser: {
                                        syntax: 'typescript',
                                        jsx: true,
                                    },
                                    preserveAllComments: false,
                                    transform: {
                                        react: {
                                            runtime: 'automatic',
                                            throwIfNamespace: true,
                                            useBuiltins: false,
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(js|jsx)$/,
                    type: 'javascript/auto',
                    exclude: [/[\\/]node_modules[\\/]/],
                    use: {
                        loader: 'builtin:swc-loader',
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'ecmascript',
                                    jsx: true,
                                    topLevelAwait: true,
                                },
                                transform: {
                                    react: {
                                        runtime: 'automatic',
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/media/[name].[contenthash][ext][query]',
                    },
                },
                {
                    test: /\.(otf|ttf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/media/[name].[contenthash][ext][query]',
                    },
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack', 'url-loader'],
                    issuer: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                },
                {
                    test: /\.json$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/json/[name].[contenthash][ext][query]',
                    },
                    resourceQuery: /config/, // *.json?config
                },
            ],
        },
        plugins: getPlugins(),
        target: 'web',
    };
};

export default configurationBuilder;

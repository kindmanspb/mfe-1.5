import { ConfigProvider } from 'antd';
import { ConfigProvider as OlderConfigProvider } from 'antd-4';


export const App = () => (
    <div>
        <h1>Example multiple Antd versions MFE</h1>
        <ConfigProvider>
            <OlderConfigProvider/>
        </ConfigProvider>
        <pre>
          {window.__FEDERATION__ ? JSON.stringify(__FEDERATION__.__SHARE__, null, 2)
              : JSON.stringify(__webpack_share_scopes__, null, 2)}
      </pre>
    </div>
);

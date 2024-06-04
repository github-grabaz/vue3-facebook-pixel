import type { App } from 'vue';
declare const _eventsConst: readonly string[];
export type TFbqEvents = typeof _eventsConst[number];
declare global {
    interface Window {
        fbq: Function;
    }
}
interface IConfig {
    debug: boolean;
    excludes?: string[];
    router?: any;
}
type TFbqData = {
    [key: string]: any;
};
interface IFbqPlugin {
    init(appId: string, data?: TFbqData): void;
    event(name: string, data?: any): void;
    query(): void;
}
export declare const useFbq: () => IFbqPlugin | undefined;
declare const _default: {
    install: (app: App<any>, options: IConfig) => void;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
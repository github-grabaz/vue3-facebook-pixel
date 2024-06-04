import { App } from 'vue';

interface IImplementsRouter {
    afterEach(route: IImplementsRoute): void;
}
interface IImplementsRoute {
    name: string;
}
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
    router?: IImplementsRouter;
}
/**
 * Regular Object. Key: srting
 * Values reference: https://developers.facebook.com/docs/meta-pixel/reference#object-properties
 */
type TFbqDataSimpleValue = string | number | string[] | number[];
type TFbqData = Record<string, TFbqDataSimpleValue | Record<string, TFbqDataSimpleValue>[]>;
interface IFbqPlugin {
    init(appId: string, data?: TFbqData): void;
    event(name: string, data?: any): void;
    query(): void;
}
export declare function useFbq(): IFbqPlugin;
export declare const VueFbq: {
    install: (app: App, options: IConfig) => void;
};
export {};

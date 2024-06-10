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
    pixelId: string;
    debug: boolean;
    excludes?: string[];
    router?: IImplementsRouter;
}
interface IFbqPlugin {
    event(name: TFbqEvents | string, data?: any): void;
    query(): void;
}
export declare function useFbq(): IFbqPlugin;
export declare const VueFbq: {
    install: (app: App, options: IConfig) => void;
};
export {};

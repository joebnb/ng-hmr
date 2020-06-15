import { NgModuleRef } from '@angular/core';
import { createNewApplication } from './libs/replace';

export type HotModuleRef = NodeModule & {
    hot: any
}

export type HmrOption = () => Promise<NgModuleRef<any>>

type AppRef = any & {
    _import_ApplicationRef_from_angular_core?: string
};

export function enableNgHmr(module: HotModuleRef) {

    return function (applicationRef: AppRef, bootstrap: HmrOption) {
        let ngModule: NgModuleRef<any>;
        bootstrap().then(mod => ngModule = mod);
        module.hot.accept((e: any) => { });
        module.hot.dispose(() => {
            const appRef: AppRef = ngModule.injector.get(applicationRef);
            const elements = appRef.components.map((component: any) => component.location.nativeElement);
            const render = createNewApplication(elements);
            ngModule.destroy();
            render();
        });
    }

}

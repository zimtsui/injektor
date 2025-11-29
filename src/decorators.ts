import { instantSetterInjector } from './injectors/instant-setter-injector.ts';
import { lazySetterInjector } from './injectors/lazy-setter-injection.ts';
import { constructorInjector } from './injectors/constructor-injector.ts';

export const instantInject = instantSetterInjector.decorator;
export const lazyInject = lazySetterInjector.decorator;
export const inject = constructorInjector.decorator;
export const injextends = constructorInjector.injextends;

# Injektor

Injektor is a dependency injection framework for TypeScript.

- No implicit globals.
- Instant Setter injection with support for circular dependency.
- Independent of experimental [metadata reflection](https://github.com/rbuckton/reflect-metadata).
- Compile-time check if there are any declared type symbols forgotten to be registered with a constructor.

## Comparison

- Why not [TSyringe](https://github.com/microsoft/tsyringe)

	TSyringe makes proxies for circular dependencies, which is too hacking.

- Why not [TypeDI](https://github.com/typestack/typedi)

	TypeDI cannot make container instance, but makes only a global container.

- Why not [InversifyJS](https://github.com/inversify/InversifyJS)

	InversifyJS cannot inject circular dependencies instantly, but can only do lazily.

## Basic usage

### Constructor injection

### Instant setter injection

### Lazy setter injection

### Singleton

### Circular Dependency

### Factory Dependency

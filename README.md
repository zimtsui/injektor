# Injektor

Injektor is a dependency SETTER injection framework.

- No implicit globals.
- Instant injection with circular dependency.
- Not dependent on experimental metadata reflection.

## Comparison

- Why not TSyringe

	TSyringe makes proxies for circular dependencies.
- Why not TypeDI

	TypeDI cannot make container instance, but makes only a global container.

- Why not InversifyJS

	InversifyJS cannot inject circular dependencies instantly, but can only do lazily.

## Basic usage

### Constructor injection

### Instant setter injection

### Lazy setter injection

### Singleton

### Circular Dependency

### Factory Dependency

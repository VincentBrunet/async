#include "scopes.h"

/**
 * Global utils
 */

void scopes_init() {

}

t_scope *scope_factory(t_u32 size) {
  t_scope *scope = calloc(1, sizeof(t_scope));
  scope->size = size;
  if (size > 0) {
    scope->items = calloc(size, sizeof(t_named));
  }
  return scope;
}

int scope_sort_compare(const void* a, const void *b) {
  return ((t_named *)a)->name - ((t_named *)b)->name;
}
void scope_sort(t_scope *scope) {
  qsort(
    scope->items,
    scope->size,
    sizeof(t_named),
    scope_sort_compare
  );
}

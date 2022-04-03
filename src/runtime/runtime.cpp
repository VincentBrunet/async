#include "runtime.hpp"

int main() {
  try {
    if (entry_module != nullptr) {
      entry_module();
    }
  } catch (...) {
    ///
  }
}

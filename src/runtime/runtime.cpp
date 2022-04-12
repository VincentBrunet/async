#include "runtime.hpp"

int main() {
  try {
    if (ac::entry_module != nullptr) {
      ac::entry_module();
    }
  } catch (...) {
    ///
  }
}

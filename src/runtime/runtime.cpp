#include "runtime.hpp"

ac::string ac::str_make(char *str) {
  ac::string value;
  return value;
}
ac::null ac::null_make() {
  ac::null value;
  return value;
}

int main() {
  try {
    if (ac::entry_module != nullptr) {
      ac::entry_module();
    }
  } catch (...) {
    ///
  }
}

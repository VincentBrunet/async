#ifndef __ac_ref_strong_H
#define __ac_ref_strong_H

#include "runtime.hpp"

namespace ac {

class ref_counter {
 public:
  ref_counter() : _counter(0){};

  ref_counter(const ref_counter&) = delete;
  ref_counter& operator=(const ref_counter&) = delete;

  ~ref_counter() {}

  void reset() {
    _counter = 0;
  }

  bool unused() {
    return _counter == 0;
  }

  // Overload post/pre increment
  void retain() {
    _counter++;
  }

  // Overload post/pre decrement
  void release() {
    _counter--;
  }

 private:
  unsigned int _counter = 0;
};

// Class representing a shared pointer
template <typename T>
class ref_strong {
 public:
  explicit ref_strong(T* ptr = nullptr) {
    _ptr = ptr;
    _counter = new ref_counter();
    if (ptr) {
      _counter->retain();
    }
  }

  ref_strong(ref_strong<T>& sp) {
    _ptr = sp._ptr;
    _counter = sp._counter;
    _counter->retain();
  }

  T* get() {
    return _ptr;
  }
  T& operator*() {
    return *_ptr;
  }
  T* operator->() {
    return _ptr;
  }

  ~ref_strong() {
    _counter->release();
    if (_counter->unused()) {
      delete _counter;
      delete _ptr;
    }
  }

 private:
  ref_counter* _counter;
  T* _ptr;
};

}  // namespace ac

#endif

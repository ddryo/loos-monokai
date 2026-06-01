<?php
// dummy class
namespace Demo\Sample;

class Widget {
  public int $count = 0;

  public function render(string $name): string {
    return "Hello {$name}";
  }
}

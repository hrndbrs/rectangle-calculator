from .base import Shape


class Rectangle(Shape):
    base: float
    height: float

    def __init__(self, base: float, height: float) -> None:
        self.base = base
        self.height = height

    @property
    def area(self) -> float:
        return self.base * self.height

    @property
    def perimeter(self) -> float:
        return 2 * (self.base + self.height)

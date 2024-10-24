from abc import ABC, abstractmethod


class Shape(ABC):
    @property
    @abstractmethod
    def area(self) -> float:
        pass

    @property
    @abstractmethod
    def perimeter(self) -> float:
        pass

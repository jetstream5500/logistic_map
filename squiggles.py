import numpy as np
import matplotlib.pyplot as plt


def logistic(x, a):
    return a*x*(1-x)

def main():
    a = 2
    iterations = 1
    xs = np.linspace(0, 1, num=500)
    ys = []

    for x in xs:
        partial = x
        for i in range(iterations):
            partial = logistic(partial, a)
        ys.append(partial)

    plt.plot(xs, ys)
    plt.plot(xs, xs)
    plt.show()

if __name__ == '__main__':
    main()

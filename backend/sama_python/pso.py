from time import process_time

from .swarm import Swarm

if __name__ == "__main__":
    start = process_time()

    swarm = Swarm()
    swarm.optimize()

    print(process_time()-start)

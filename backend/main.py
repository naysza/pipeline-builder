from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: list[Any]
    edges: list[Any]


def is_dag(nodes: list, edges: list) -> bool:
    """Return True if the graph formed by nodes/edges is a Directed Acyclic Graph."""
    node_ids = {n["id"] for n in nodes}

    # Build adjacency list
    adj = {nid: [] for nid in node_ids}
    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in adj and tgt in node_ids:
            adj[src].append(tgt)

    # Kahn's algorithm (topological sort)
    in_degree = {nid: 0 for nid in node_ids}
    for neighbors in adj.values():
        for nb in neighbors:
            in_degree[nb] += 1

    queue = [nid for nid, deg in in_degree.items() if deg == 0]
    visited = 0

    while queue:
        node = queue.pop()
        visited += 1
        for nb in adj[node]:
            in_degree[nb] -= 1
            if in_degree[nb] == 0:
                queue.append(nb)

    return visited == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}

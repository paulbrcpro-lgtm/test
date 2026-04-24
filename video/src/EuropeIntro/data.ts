import { feature } from "topojson-client";
import type { Feature, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import topo from "world-atlas/countries-50m.json";

const topology = topo as unknown as Topology<{
  countries: GeometryCollection<{ name: string }>;
}>;

const collection = feature(topology, topology.objects.countries);

export const countryFeatures: Feature<Geometry, { name: string }>[] =
  collection.features;

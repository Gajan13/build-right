// Stock photography. Sources and licences: docs/image-credits.md.
// None of these show Build Right projects, so never caption them as the company's work.
import houseProgress from "@/public/images/about-house-progress.jpg";
import lagoon from "@/public/images/about-jaffna-lagoon.jpg";
import jaffnaRoad from "@/public/images/about-jaffna-road.jpg";
import siteDusk from "@/public/images/about-site-dusk.jpg";
import foundation from "@/public/images/build-foundation.jpg";
import joinery from "@/public/images/build-joinery.jpg";
import masonry from "@/public/images/build-masonry.jpg";
import planning from "@/public/images/build-planning.jpg";
import plaster from "@/public/images/build-plaster.jpg";
import roof from "@/public/images/build-roof-tiles.jpg";
import slab from "@/public/images/build-slab.jpg";
import heroNewHouse from "@/public/images/service-hero-new-house.jpg";
import heroRoof from "@/public/images/service-hero-roof.jpg";
import heroRepair from "@/public/images/service-hero-repair.jpg";
import heroTiling from "@/public/images/service-hero-tiling.jpg";
import heroPlumbing from "@/public/images/service-hero-plumbing.jpg";
import heroElectrical from "@/public/images/service-hero-electrical.jpg";
import heroSolar from "@/public/images/service-hero-solar.jpg";
import projectBlueBungalow from "@/public/images/project-blue-bungalow.jpg";
import projectBrickTile from "@/public/images/project-brick-tile.jpg";
import projectBungalowRoof from "@/public/images/project-bungalow-roof.jpg";
import projectCourtyard from "@/public/images/project-courtyard.jpg";
import projectTimberStone from "@/public/images/project-timber-stone.jpg";
import electrical from "@/public/images/service-electrical.jpg";
import newHouse from "@/public/images/service-new-house.jpg";
import plumbing from "@/public/images/service-plumbing.jpg";
import repair from "@/public/images/service-repair.jpg";
import roofReplacement from "@/public/images/service-roof.jpg";
import solar from "@/public/images/service-solar.jpg";
import tiling from "@/public/images/service-tiling.jpg";
import servicesSunset from "@/public/images/services-sunset.jpg";
import projectsDusk from "@/public/images/projects-dusk.jpg";
import contactDoorway from "@/public/images/contact-doorway.jpg";
import heroBlueprint from "@/public/images/hero-home-blueprint.svg";
import hero from "@/public/images/hero-home-palms.jpg";
import hippedRoof from "@/public/images/home-hipped-roof.jpg";
import interior from "@/public/images/home-interior.jpg";
import louvres from "@/public/images/home-louvres.jpg";
import timberStone from "@/public/images/home-timber-stone.jpg";
import verandah from "@/public/images/home-verandah.jpg";
import causeway from "@/public/images/jaffna-causeway.jpg";
import fort from "@/public/images/jaffna-fort.jpg";
import nallur from "@/public/images/jaffna-nallur.jpg";
import carpenter from "@/public/images/trade-carpenter.jpg";
import drafting from "@/public/images/trade-drafting.jpg";
import electrician from "@/public/images/trade-electrician.jpg";
import mason from "@/public/images/trade-mason.jpg";
import painter from "@/public/images/trade-painter.jpg";
import steel from "@/public/images/trade-steel.jpg";
import surveyor from "@/public/images/trade-surveyor.jpg";
import type { Photo } from "./types";

export const images = {
  hero: { src: hero, alt: "Modern concrete and timber house among palm trees" },
  // Traced over the hero photo. If the photo changes, this drawing has to change with it.
  heroBlueprint: { src: heroBlueprint, alt: "Blueprint drawing of a modern house among palm trees" },
  timberStone: { src: timberStone, alt: "House of timber and natural stone among palm trees" },
  louvres: { src: louvres, alt: "House with a deep roof and timber louvres above a garden" },
  hippedRoof: { src: hippedRoof, alt: "Two-storey house with wide hipped roofs and palm trees" },
  verandah: { src: verandah, alt: "Traditional tiled-roof bungalow behind bougainvillea" },
  interior: { src: interior, alt: "Bright open living room with timber furniture and plants" },
  planning: { src: planning, alt: "Floor plans with drafting pencils and a ruler" },
  foundation: { src: foundation, alt: "Builders standing on a newly cast concrete slab" },
  slab: { src: slab, alt: "Two builders spreading wet concrete over steel reinforcement" },
  masonry: { src: masonry, alt: "Mason laying a block wall with a trowel" },
  roof: { src: roof, alt: "Curved terracotta roof tiles" },
  plaster: { src: plaster, alt: "Hands smoothing plaster with trowels" },
  joinery: { src: joinery, alt: "Carpenter shaping timber at a workbench" },
  fort: { src: fort, alt: "Sun over the grass ramparts of Jaffna Fort" },
  nallur: { src: nallur, alt: "Cyclist passing a red and white striped temple wall in Jaffna" },
  causeway: { src: causeway, alt: "Stone causeway across the moat of Jaffna Fort" },
  siteDusk: { src: siteDusk, alt: "Builders silhouetted among steel reinforcement at dusk" },
  houseProgress: { src: houseProgress, alt: "Brick house under construction with its ring beam in place" },
  lagoon: { src: lagoon, alt: "Bicycle beside the lagoon in Jaffna while two people work at the water's edge" },
  jaffnaRoad: { src: jaffnaRoad, alt: "Low sun at the end of a tree-lined road in Jaffna" },
  surveyor: { src: surveyor, alt: "Surveyor taking notes beside a total station in long grass" },
  drafting: { src: drafting, alt: "Hand drawing plans beside a scale ruler" },
  mason: { src: mason, alt: "Weathered hand setting a red brick on a wall" },
  steel: { src: steel, alt: "Worker bending over a mat of steel reinforcement" },
  carpenter: { src: carpenter, alt: "Hand marking timber with a pencil among wood shavings" },
  electrician: { src: electrician, alt: "Electrician in a helmet and gloves fitting a wall switch box" },
  painter: { src: painter, alt: "Hand rolling fresh paint onto a wall" },
  servicesSunset: { src: servicesSunset, alt: "Setting sun behind steel reinforcement on a building site" },
  newHouse: { src: newHouse, alt: "Builders working on the concrete frame of a new house" },
  roofReplacement: { src: roofReplacement, alt: "Broken and slipping clay roof tiles" },
  repair: { src: repair, alt: "Old brick wall with fresh patches of mortar over damaged plaster" },
  tiling: { src: tiling, alt: "Tiler spreading mortar between terracotta floor tiles" },
  plumbing: { src: plumbing, alt: "Neat rows of white water pipes on a wall" },
  electrical: { src: electrical, alt: "Wall socket with its wiring exposed during installation" },
  solar: { src: solar, alt: "Solar panels on the tiled roof of a house" },
  heroNewHouse: { src: heroNewHouse, alt: "Mason at the top of a block gable wall among trees" },
  heroRoof: { src: heroRoof, alt: "Two roofers in safety harnesses working on a roof" },
  heroRepair: { src: heroRepair, alt: "Hands loading a trowel with plaster to repair a wall" },
  heroTiling: { src: heroTiling, alt: "Tiler spreading mortar between floor tiles" },
  heroPlumbing: { src: heroPlumbing, alt: "Plumber tightening the pipes under a sink" },
  heroElectrical: { src: heroElectrical, alt: "Electrician in a helmet and gloves working on a switch box" },
  heroSolar: { src: heroSolar, alt: "Two installers in harnesses fitting a solar panel on a roof" },
  projectCourtyard: { src: projectCourtyard, alt: "Two-storey house with deep timber eaves beside a lawn and pool" },
  projectBungalowRoof: { src: projectBungalowRoof, alt: "White bungalow with timber windows under a clay tiled roof" },
  projectTimberStone: { src: projectTimberStone, alt: "Two-storey timber and stone house with a covered carport" },
  projectBrickTile: { src: projectBrickTile, alt: "Brick house with a red tiled roof seen through trees" },
  projectBlueBungalow: { src: projectBlueBungalow, alt: "Blue bungalow behind a boundary wall and gate" },
  projectsDusk: { src: projectsDusk, alt: "House with lit windows under a purple evening sky" },
  contactDoorway: { src: contactDoorway, alt: "Warm light through the windows and doors of a house at night" },
} satisfies Record<string, Photo>;

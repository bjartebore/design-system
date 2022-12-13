import { promises as fs } from 'fs'
import { PATHS } from '../figma-broker/constants.js'
import { gridResolution } from './constants.mjs'

const density = {
  TIGHT: 'tight',
  COMPRESSED: 'compressed',
  COMFORTABLE: 'comfortable',
  RELAXED: 'relaxed',
}

const numOfTypeScaleSteps = 10
const BUILD_DIR = `${PATHS.FIGMA}/readonly`

const typeScale = [...Array(numOfTypeScaleSteps).keys()] // [0, 1, ... 9]

const spreadToGrid = (num) => num * gridResolution

const spacing = [...Array(7).keys()].map(spreadToGrid) // [0, 4, 8, ... 24]

const type = {
  COMPOSITION: 'composition',
}

const verticalSnapped = (density, spacing, typeScale) => ({
  paddingBottom: `roundTo(${spacing} - ({eds.core.lineHeight.${density}.${typeScale}} - {eds.core.capHeight.rounded.${typeScale}}) / 2)`,
  paddingTop: `${spacing} * 2 + {eds.core.const.grid} * ceil({eds.core.capHeight.rounded.${typeScale}} / {eds.core.const.grid}) - {eds.core.lineHeight.${density}.${typeScale}} - roundTo(${spacing} - ({eds.core.lineHeight.${density}.${typeScale}} - {eds.core.capHeight.rounded.${typeScale}}) / 2)`,
})

const verticalCentered = (density, spacing, typeScale) => ({
  verticalPadding: `(${spacing} * 2 + {eds.core.capHeight.snappedToGrid.${typeScale}} - {eds.core.lineHeight.${density}.${typeScale}}) / 2`,
})

const template = (density, snapped, vertSpace, typeScale) => ({
  value: {
    ...(snapped
      ? verticalSnapped(density, vertSpace, typeScale)
      : verticalCentered(density, vertSpace, typeScale)),
    typography: `{eds.core.typography.${density}.${typeScale}}`,
    itemSpacing: 0,
  },
  type: type.COMPOSITION,
})

const data = (density) => ({
  eds: {
    core: {
      spacing: {
        block: {
          [density]: {
            onGrid: Object.fromEntries(
              spacing
                .slice(3, 5)
                .map((vertSpace) => [
                  `${vertSpace}`,
                  Object.fromEntries(
                    typeScale.map((type) => [
                      `${type}`,
                      template(density, true, vertSpace, type),
                    ]),
                  ),
                ]),
            ),
            offGrid: Object.fromEntries(
              spacing
                .slice(3, 5)
                .map((vertSpace) => [
                  `${vertSpace}`,
                  Object.fromEntries(
                    typeScale.map((type) => [
                      `${type}`,
                      template(density, false, vertSpace, type),
                    ]),
                  ),
                ]),
            ),
          },
        },
      },
    },
  },
})

async function writeToFile(density) {
  await fs.writeFile(
    `${BUILD_DIR}/${density}.json`,
    JSON.stringify(data(density), null, 2),
    {
      encoding: 'utf-8',
    },
  )
}

writeToFile(density.TIGHT)
writeToFile(density.COMPRESSED)
// writeToFile(density.COMFORTABLE)
// writeToFile(density.RELAXED)

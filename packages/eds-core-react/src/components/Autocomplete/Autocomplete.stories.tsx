/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect, useMemo } from 'react'
import { Autocomplete, AutocompleteProps, AutocompleteChanges } from '.'
import { Checkbox } from '../Checkbox'
import { Story, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { useForm, Controller } from 'react-hook-form'
import { Typography, EdsProvider, Button, Chip } from '../..'
import { Stack } from '../../../.storybook/components'
import page from './Autocomplete.docs.mdx'

export default {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  argTypes: {
    selectedOptions: { control: { type: null } },
    ref: { control: { type: null } },
  },
  parameters: {
    docs: {
      page,
      source: {
        excludeDecorators: true,
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack direction="column">
          <Story />
        </Stack>
      )
    },
  ],
} as ComponentMeta<typeof Autocomplete>

type MyOptionType = {
  label: string
  symbol?: string
  trend?: string
}

const counties = [
  'Oslo',
  'Rogaland',
  'Møre og Romsdal',
  'Nordland',
  'Viken',
  'Innlandet',
  'Vestfold og Telemark',
  'Agder',
  'Vestland',
  'Trøndelag',
  'Troms og Finnmark',
]

const stocks = [
  {
    label: 'Microsoft Corporation',
    symbol: 'MSFT',
    trend: '📉',
  },
  {
    label: 'Tesla, Inc',
    symbol: 'TSLA',
    trend: '📈',
  },
  {
    label: 'Apple Inc.',
    symbol: 'AAPL',
    trend: '📈',
  },
  {
    label: 'NVIDIA Corporation',
    symbol: 'NVDA',
    trend: '📉',
  },
  {
    label: 'Alphabet Inc.',
    symbol: 'GOOG',
    trend: '📈',
  },
  {
    label: 'Amazon.com, Inc.',
    symbol: 'AMZN',
    trend: '📉',
  },
  {
    label: 'Meta Platforms, Inc.',
    symbol: 'FB',
    trend: '📉',
  },
  {
    label: 'Berkshire Hathaway Inc.',
    symbol: 'BRK',
    trend: '📈',
  },
  {
    label: 'Awilco LNG',
    symbol: 'ALNG',
    trend: '📈',
  },
  {
    label: 'Kahoot! ASA',
    symbol: 'KAHOT',
    trend: '📈',
  },
  {
    label: 'Nordic Semiconductor',
    symbol: 'NCO',
    trend: '📈',
  },
  {
    label: 'Vår energi ASA',
    symbol: 'VAR',
    trend: '📈',
  },
  {
    label: 'Rivian Automotive A',
    symbol: 'RIVN',
    trend: '📈',
  },
]

const optionLabel = (item: MyOptionType) => item.label

const labelWithIcon = (opt: MyOptionType) =>
  `${opt.trend} ${opt.label} (${opt.symbol})`

export const Introduction: Story<AutocompleteProps<string>> = (args) => {
  return <Autocomplete {...args} />
}
Introduction.bind({})
Introduction.args = {
  label: 'Select a stock',
  options: stocks.map((item) => item.label),
  multiple: false,
  readOnly: false,
  disabled: false,
  disablePortal: false,
}

export const Multiple: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options } = args

  return (
    <>
      <Autocomplete
        label="Select multiple stocks"
        options={options}
        multiple
        optionLabel={optionLabel}
      />
    </>
  )
}
Multiple.args = {
  options: stocks,
}

export const OptionLabel: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options } = args

  return (
    <>
      <Autocomplete
        label="Select a stock"
        options={options}
        optionLabel={(opt) => `${opt.trend} ${opt.label} (${opt.symbol})`}
        initialSelectedOptions={[options[1]]}
      />
    </>
  )
}
OptionLabel.storyName = 'Objects as options'
OptionLabel.args = {
  options: stocks,
}

export const Controlled: Story<AutocompleteProps<string>> = (args) => {
  const { options } = args

  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Vestland',
    'Viken',
  ])

  const onChange = (changes: AutocompleteChanges<string>) => {
    setSelectedItems(changes.selectedItems)
  }

  return (
    <>
      <Typography>
        Your selected items:{' '}
        {selectedItems.map(
          (x, index) => `${x}${index < selectedItems.length - 1 ? ', ' : ''}`,
        )}
      </Typography>
      <Autocomplete
        label="Select counties"
        options={options}
        onOptionsChange={onChange}
        selectedOptions={selectedItems}
        multiple
      />
    </>
  )
}
Controlled.args = {
  options: counties,
}

export const ReadOnly: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options, optionLabel } = args
  return (
    <>
      <Autocomplete
        label="Select a stock"
        options={options}
        optionLabel={optionLabel}
        initialSelectedOptions={[options[3]]}
        readOnly
      />
    </>
  )
}
ReadOnly.storyName = 'Read only'
ReadOnly.args = {
  options: stocks,
  optionLabel,
}

export const Disabled: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options, optionLabel } = args

  return (
    <>
      <Autocomplete
        label="Select a stock"
        options={options}
        optionLabel={optionLabel}
        disabled
      />
    </>
  )
}
Disabled.args = {
  options: stocks,
  optionLabel,
}

export const DisabledOption: Story<AutocompleteProps<MyOptionType>> = (
  args,
) => {
  const { options, optionLabel } = args

  const isOptionDisabled = (item: MyOptionType) => item.trend === '📉'

  return (
    <>
      <Autocomplete
        label="Select a stock"
        options={options}
        optionDisabled={isOptionDisabled}
        optionLabel={optionLabel}
      />
    </>
  )
}
DisabledOption.storyName = 'Disabled option'
DisabledOption.args = {
  options: stocks,
  optionLabel: labelWithIcon,
}

export const PreselectedOptions: Story<AutocompleteProps<MyOptionType>> = (
  args,
) => {
  const { options, optionLabel } = args

  return (
    <>
      <Autocomplete
        label="Select multiple stocks"
        initialSelectedOptions={[options[0], options[1], options[5]]}
        options={options}
        optionLabel={optionLabel}
        multiple
      />
    </>
  )
}
PreselectedOptions.storyName = 'Preselected options'
PreselectedOptions.args = {
  options: stocks,
  optionLabel,
}

export const Compact: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options, optionLabel } = args
  const [compact, setComfortable] = useState<boolean>(true)

  return (
    <EdsProvider density={compact ? 'compact' : 'comfortable'}>
      <Checkbox
        label="Compact"
        onChange={() => {
          setComfortable(!compact)
        }}
        checked={compact}
      />
      <Autocomplete
        label="Select a stock"
        initialSelectedOptions={[options[0]]}
        options={options}
        optionLabel={optionLabel}
      />
    </EdsProvider>
  )
}
Compact.args = {
  options: stocks,
  optionLabel,
}

export const CustomOptionsFilter: Story<AutocompleteProps<MyOptionType>> = (
  args,
) => {
  const { options, optionLabel } = args

  const optionsFilter: AutocompleteProps<MyOptionType>['optionsFilter'] = (
    option,
    inputValue,
  ) =>
    (option.label + option.symbol)
      .toLowerCase()
      .includes(inputValue.toLocaleLowerCase())

  return (
    <div style={{ width: '300px' }}>
      <Autocomplete
        label="Select stocks"
        placeholder="Try searching for MSFT"
        options={options}
        optionLabel={optionLabel}
        optionsFilter={optionsFilter}
        multiple
      />
    </div>
  )
}
CustomOptionsFilter.storyName = 'Custom options filter'
CustomOptionsFilter.args = {
  options: stocks,
  optionLabel,
}

export const AutoWidth: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options } = args

  return (
    <>
      <Autocomplete
        optionLabel={(opt) => `${opt.trend} ${opt.label}`}
        label="Select a stock"
        options={options}
        autoWidth
      />
      <Autocomplete
        optionLabel={optionLabel}
        label="Select multiple stocks"
        options={options}
        multiple
        autoWidth
        multiline
      />
    </>
  )
}
AutoWidth.storyName = 'Adjusting dropdown width'
AutoWidth.args = {
  options: stocks,
  optionLabel,
}

export const Virtualized: Story<AutocompleteProps<MyOptionType>> = () => {
  type Photo = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
  }
  const [data, setData] = useState<Array<string>>([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    fetch(`https://jsonplaceholder.typicode.com/photos`, { signal })
      .then((r) => r.json())
      .then((d: Photo[]) => {
        const parsed = d.map((x) => x.title.substring(0, 30))
        setData(parsed)
      })
      .catch((err: Error) => {
        console.warn(`Warning: ${err.message}`)
      })
    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <>
      <Autocomplete
        label="Select multiple items"
        options={data}
        multiple
        clearSearchOnChange={false}
      />
    </>
  )
}

type MyFormValues = {
  origin: string | null
  favouriteCounty: string | null
  fruits: { label: string; emoji: string }[]
}

export const WithReactHookForm: Story<AutocompleteProps<MyOptionType>> = () => {
  const defaultValues: MyFormValues = {
    origin: null,
    favouriteCounty: null,
    fruits: [],
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<MyFormValues>({
    defaultValues,
  })

  const [isSubmitted, updateIsSubmitted] = useState(false)
  const [formData, updateFormData] = useState<MyFormValues | null>(null)
  const values = watch()

  return (
    <form
      onSubmit={handleSubmit((data: MyFormValues) => {
        updateFormData(data)
        updateIsSubmitted(true)
        action('onSubmit')(data)
      })}
    >
      {isSubmitted ? (
        <>
          <Typography variant="h4" style={{ marginBottom: '16px' }}>
            Submitted data:
          </Typography>
          <Typography>{JSON.stringify(formData, null, 4)}</Typography>
          <Button
            style={{ marginTop: '16px' }}
            variant="outlined"
            onClick={() => {
              updateIsSubmitted(false)
              updateFormData(null)
              reset()
            }}
          >
            Reset
          </Button>
        </>
      ) : (
        <>
          <div style={{ margin: '16px 0' }}>
            <Controller
              control={control}
              name="origin"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  onOptionsChange={({ selectedItems }) => {
                    console.log('selected origin', selectedItems)
                    const [selectedItem] = selectedItems
                    onChange(selectedItem)
                  }}
                  selectedOptions={[values.origin]}
                  label="Where are you from?"
                  options={counties}
                  aria-invalid={errors.origin ? 'true' : 'false'}
                  aria-describedby="error-county-required"
                  aria-required
                  autoWidth
                />
              )}
            />
            <span
              role="alert"
              id="error-county-required"
              style={{
                color: 'red',
                paddingTop: '0.5rem',
                fontSize: '0.75rem',
                display:
                  errors.origin && errors.origin.type === 'required'
                    ? 'block'
                    : 'none',
              }}
            >
              Hey you! This field is required
            </span>
          </div>
          <div style={{ margin: '16px 0' }}>
            <Controller
              control={control}
              name="favouriteCounty"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  onOptionsChange={({ selectedItems }) => {
                    const [selectedItem] = selectedItems
                    onChange(selectedItem)
                  }}
                  selectedOptions={[values.favouriteCounty]}
                  label="Choose your favourite county"
                  options={counties}
                  autoWidth
                />
              )}
            />
          </div>
          <div style={{ margin: '16px 0' }}>
            <Controller
              control={control}
              name="fruits"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  onOptionsChange={({ selectedItems }) => {
                    onChange(selectedItems)
                  }}
                  selectedOptions={values.fruits}
                  label="Pick atleast two fruits (optional)"
                  options={[
                    { label: 'Banana', emoji: '🍌' },
                    { label: 'Apple', emoji: '🍎' },
                    { label: 'Grapes', emoji: '🍇' },
                    { label: 'Kiwi', emoji: '🥝' },
                    { label: 'Pineapple', emoji: '🍍' },
                  ]}
                  optionLabel={(opt) => `${opt?.emoji} ${opt?.label}`}
                  multiple
                  autoWidth
                />
              )}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button type="submit">I have made my decisions!</Button>
            <Button variant="outlined" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </>
      )}
    </form>
  )
}

export const SelectAll: Story<AutocompleteProps<MyOptionType>> = (args) => {
  const { options } = args

  const selectAllOption: MyOptionType = useMemo(
    () => ({
      label: 'Select All',
    }),
    [],
  )

  const optionsWithAll = useMemo(
    () => [selectAllOption, ...options],
    [options, selectAllOption],
  )

  const [selectedItems, setSelectedItems] = useState<MyOptionType[]>([])

  const onChange = (changes: AutocompleteChanges<MyOptionType>) => {
    const nextAll = changes.selectedItems.find(
      (item) => item.label === selectAllOption.label,
    )
    const prevAll = selectedItems.find(
      (item) => item.label === selectAllOption.label,
    )

    switch (true) {
      case nextAll && selectedItems.length === 1:
      case prevAll && !nextAll:
        setSelectedItems([])
        break
      case !prevAll && changes.selectedItems.length === options.length:
      case nextAll && !prevAll:
        setSelectedItems(optionsWithAll)
        break
      case nextAll &&
        changes.selectedItems.length === optionsWithAll.length - 1:
        setSelectedItems(
          changes.selectedItems.filter(
            (option) => !(option.label === selectAllOption.label),
          ),
        )
        break
      default:
        setSelectedItems(changes.selectedItems)
        break
    }
  }

  const onDelete = (itemLabel: string) =>
    setSelectedItems(selectedItems.filter((x) => !(x.label === itemLabel)))

  return (
    <>
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(4, auto)',
        }}
      >
        {selectedItems
          .filter((option) => !(option.label === selectAllOption.label))
          .map((x) => (
            <Chip key={x.label} onDelete={() => onDelete(x.label)}>
              {x.label}
            </Chip>
          ))}
      </div>
      <Autocomplete
        label="Select stocks"
        options={optionsWithAll}
        selectedOptions={selectedItems}
        onOptionsChange={onChange}
        multiple
        optionLabel={optionLabel}
      />
    </>
  )
}
SelectAll.storyName = 'Select all'
SelectAll.args = {
  options: stocks,
  optionLabel,
}

import { useCallback, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

import { Button, NumberInput, Text, TextInput } from '@/components/ui/core';
import { ROUTES } from '@/constants';
import { NativeFieldset, NativeFlex, NativeGroup, NativeScrollArea, randomId, useLocation } from '@/libs';

export const ReviewBill = () => {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<any>(null);


  useEffect(() => {
    const storedData = window.sessionStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
      window.sessionStorage.removeItem('data');
    }
  }, []);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      items: [] 
    },
  });

  
  useEffect(() => {
    if (data && data.gemini_analysis && data.gemini_analysis.line_items) {
      const items = data.gemini_analysis.line_items.map((item: { item_name: any; rate: any; amount: any; quantity: any; }) => ({
        name: item.item_name,
        price: item.rate,
        total: item.amount,
        qty: item.quantity,
        key: randomId() 
      }));
      form.setValues({ items });
    }
  }, [data, form]);

  const handleSubmit = useCallback(() => {
    if (!form.validate().hasErrors) {
      setLocation(ROUTES.ADD_PARTICIPANTS);
    }
  }, [form, setLocation]);

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
          Review Bill details
        </Text>

        <NativeScrollArea.Autosize offsetScrollbars type="auto">
          <form className="space-y-6" onSubmit={form.onSubmit((values) => console.log(values))}>
            {form.getValues().items.map(({ key }, index) => (
              <NativeFieldset key={key} legend={`Item ${index + 1}`} radius="md" classNames={{ root: 'bg-slate-50' }}>
                <NativeFlex justify="space-between" mt="md">
                  <TextInput
                    size="md"
                    radius="md"
                    w="100%"
                    label="Name"
                    placeholder="quattro formaggi"
                    key={form.key(`items.${index}.name`)}
                    {...form.getInputProps(`items.${index}.name`)}
                  />
                </NativeFlex>

                <NativeFlex justify="space-between" mt="md">
                  <NumberInput
                    w="45%"
                    prefix="₹"
                    size="md"
                    label="Price"
                    min={0}
                    radius="md"
                    key={form.key(`items.${index}.price`)}
                    {...form.getInputProps(`items.${index}.price`)}
                  />
                  <NumberInput
                    w="45%"
                    size="md"
                    radius="md"
                    min={0}
                    max={100}
                    clampBehavior="strict"
                    label="Qty"
                    key={form.key(`items.${index}.qty`)}
                    {...form.getInputProps(`items.${index}.qty`)}
                  />
                </NativeFlex>

                <NativeFlex justify="space-between" mt="md">
                  <NumberInput
                    size="md"
                    min={0}
                    radius="md"
                    prefix="₹"
                    label="Total Amount"
                    w="100%"
                    key={form.key(`items.${index}.total`)}
                    {...form.getInputProps(`items.${index}.total`)}
                  />
                </NativeFlex>
              </NativeFieldset>
            ))}
          </form>
        </NativeScrollArea.Autosize>
      </div>

      <NativeGroup>
  <NativeFlex w="100%" justify="space-between">
    <Text fz="xl">Discount:</Text>
    <Text fz="xl">{data?.gemini_analysis?.total_discounts ?? 0}</Text>
  </NativeFlex>
  <NativeFlex w="100%" justify="space-between">
    <Text fz="xl">Taxes:</Text>
    <Text fz="xl">{data?.gemini_analysis?.total_taxes ?? 0}</Text>
  </NativeFlex>
  <NativeFlex w="100%" justify="space-between">
    <Text fz="xl">Total:</Text>
    <Text fz="xl">
      {data?.gemini_analysis?.line_items.reduce(
        (acc: any, item: { amount: any; }) => acc + item.amount,
        0
      ) + (data?.gemini_analysis?.total_discounts ?? 0) + (data?.gemini_analysis?.total_taxes ?? 0)}
    </Text>
  </NativeFlex>
  <Button fullWidth size="lg" onClick={handleSubmit}>
    Next (3/5)
  </Button>
</NativeGroup>
    </div>
  );
};

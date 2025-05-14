import { produce } from 'immer';
import { WritableAtom } from 'jotai';
import { atom, type PrimitiveAtom } from 'jotai';
import { atomWithDefault, RESET } from 'jotai/utils';
import { type SetStateAction } from 'react';

export function usePluginAtoms<
  T extends {
    common: Record<string, unknown>;
    conditions: ({ id: string } & Record<string, unknown>)[];
  },
>(
  pluginConfigAtom: PrimitiveAtom<T>,
  options: { enableCommonCondition: true }
): {
  pluginConditionsAtom: PrimitiveAtom<T['conditions']>;
  hasMultipleConditionsAtom: PrimitiveAtom<boolean>;
  conditionsLengthAtom: PrimitiveAtom<number>;
  selectedConditionIdAtom: WritableAtom<
    string | null,
    [typeof RESET | SetStateAction<string | null>],
    void
  >;
  isConditionIdUnselectedAtom: PrimitiveAtom<boolean>;
  selectedConditionAtom: PrimitiveAtom<T['conditions'][number]>;
  getConditionPropertyAtom: <F extends keyof T['conditions'][number]>(
    property: F
  ) => PrimitiveAtom<T['conditions'][number][F]>;
  commonConfigAtom: PrimitiveAtom<T['common']>;
};

// enableCommonCondition: false または未指定の場合の型
export function usePluginAtoms<
  T extends { conditions: ({ id: string } & Record<string, unknown>)[] },
>(
  pluginConfigAtom: PrimitiveAtom<T>,
  options?: { enableCommonCondition?: false }
): {
  pluginConditionsAtom: PrimitiveAtom<T['conditions']>;
  hasMultipleConditionsAtom: PrimitiveAtom<boolean>;
  conditionsLengthAtom: PrimitiveAtom<number>;
  selectedConditionIdAtom: WritableAtom<
    string | null,
    [typeof RESET | SetStateAction<string | null>],
    void
  >;
  isConditionIdUnselectedAtom: PrimitiveAtom<boolean>;
  selectedConditionAtom: PrimitiveAtom<T['conditions'][number]>;
  getConditionPropertyAtom: <F extends keyof T['conditions'][number]>(
    property: F
  ) => PrimitiveAtom<T['conditions'][number][F]>;
};

export function usePluginAtoms<
  T extends {
    conditions: ({ id: string } & Record<string, unknown>)[];
  } & Partial<{
    common: Record<string, unknown>;
  }>,
>(
  pluginConfigAtom: PrimitiveAtom<T>,
  options?: {
    enableCommonCondition?: boolean;
  }
) {
  type Condition = T['conditions'][number];

  const { enableCommonCondition = false } = options || {};

  // 📦 optics-tsを使用した際にwebpackの型推論が機能しない場合があるため、一時的に代替する関数を使用
  // const pluginConditionsAtom = focusAtom(pluginConfigAtom, (s) => s.prop('conditions'));
  const pluginConditionsAtom = atom(
    (get) => get(pluginConfigAtom).conditions as Condition[],
    (_, set, newValue: SetStateAction<Condition[]>) => {
      set(pluginConfigAtom, (current) => {
        if (typeof newValue === 'function') {
          return { ...current, conditions: newValue(current.conditions) };
        }
        return { ...current, conditions: newValue };
      });
    }
  );

  const hasMultipleConditionsAtom = atom((get) => {
    const conditions = get(pluginConditionsAtom);
    return conditions.length > 1;
  });

  const selectedConditionIdAtom = atomWithDefault<string | null>((get) =>
    enableCommonCondition ? null : (get(pluginConditionsAtom)[0]?.id ?? null)
  );

  const isConditionIdUnselectedAtom = atom((get) => get(selectedConditionIdAtom) === null);

  const selectedConditionAtom = atom(
    (get) => {
      const conditions = get(pluginConditionsAtom);
      const selectedConditionId = get(selectedConditionIdAtom);
      return conditions.find((condition) => condition.id === selectedConditionId) ?? conditions[0]!;
    },
    (get, set, newValue: SetStateAction<Condition>) => {
      const selectedConditionId = get(selectedConditionIdAtom);
      set(pluginConditionsAtom, (current) =>
        produce(current, (draft) => {
          const index = draft.findIndex((condition) => condition.id === selectedConditionId);
          if (index !== -1) {
            //@ts-ignore
            draft[index] = typeof newValue === 'function' ? newValue(draft[index]!) : newValue;
          }
        })
      );
    }
  );

  // 📦 optics-tsを使用した際にwebpackの型推論が機能しない場合があるため、一時的に代替する関数を使用
  // const getConditionPropertyAtom = <T extends keyof PluginCondition>(property: T) =>
  //   focusAtom(selectedConditionAtom, (s) => s.prop(property)) as PrimitiveAtom<PluginCondition[T]>;
  const getConditionPropertyAtom = <F extends keyof Condition>(property: F) =>
    atom(
      (get) => {
        return get(selectedConditionAtom)[property];
      },
      (_, set, newValue: SetStateAction<Condition[F]>) => {
        set(selectedConditionAtom, (condition) =>
          produce(condition, (draft) => {
            //@ts-ignore
            draft[property] = typeof newValue === 'function' ? newValue(draft[property]) : newValue;
          })
        );
      }
    );

  if (!enableCommonCondition) {
    return {
      pluginConditionsAtom,
      hasMultipleConditionsAtom,
      conditionsLengthAtom: atom((get) => get(pluginConditionsAtom).length),
      selectedConditionIdAtom,
      isConditionIdUnselectedAtom,
      selectedConditionAtom,
      getConditionPropertyAtom,
    };
  }

  type CommonConfig = T['common'];

  // 📦 optics-tsを使用した際にwebpackの型推論が機能しない場合があるため、一時的に代替する関数を使用
  // const commonConfigAtom = focusAtom(pluginConfigAtom, (s) => s.prop('common'));
  const commonConfigAtom = atom(
    (get) => get(pluginConfigAtom).common as CommonConfig,
    (_, set, newValue: SetStateAction<CommonConfig>) => {
      set(pluginConfigAtom, (current) =>
        produce(current, (draft) => {
          draft.common = typeof newValue === 'function' ? newValue(draft.common) : newValue;
        })
      );
    }
  );

  return {
    pluginConditionsAtom,
    hasMultipleConditionsAtom,
    conditionsLengthAtom: atom((get) => get(pluginConditionsAtom).length),
    selectedConditionIdAtom,
    isConditionIdUnselectedAtom,
    selectedConditionAtom,
    getConditionPropertyAtom,
    commonConfigAtom,
  };
}

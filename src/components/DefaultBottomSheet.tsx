import React, { forwardRef, useCallback, useEffect, useState, useImperativeHandle, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { DefaultIcon } from './DefaultIcon';
import { IconName } from '../@types/iconName';
import { DefaultText } from './DefaultText';
import theme from '../theme/theme';
import { VehicleNote } from '../@types/vehicleNote';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';


type BottomSheetOption = {
  label: string;
  iconName: IconName;
  onPress: () => void;
};

interface DefaultBottomSheetProps {
  options: BottomSheetOption[];
  notes?: VehicleNote[];
  onFilterResults: (results: VehicleNote[]) => void;
}

export type DefaultBottomSheetRefProps = {
  openSearchScreen: () => void;
  openOptionsScreen: () => void;
  openFilterScreen: () => void;
  expand?: () => void; // Adicionando a função expand()
};


const BOTTOM_SHEET_BORDER_RADIUS = 13;

export const DefaultBottomSheet = forwardRef<DefaultBottomSheetRefProps, DefaultBottomSheetProps>(
  ({ options, notes = [], onFilterResults }, ref) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const [currentScreen, setCurrentScreen] = useState<'options' | 'search' | 'filter'>('options');

    const [searchQuery, setSearchQuery] = useState('');


    useImperativeHandle(ref, () => ({
      openSearchScreen: () => {
        setCurrentScreen('search');
        bottomSheetRef.current?.expand();
      },
      openOptionsScreen: () => {
        setCurrentScreen('options');
        bottomSheetRef.current?.expand();
      },
      openFilterScreen: () => {
        setCurrentScreen('filter');
        bottomSheetRef.current?.expand();
      },
      expand: () => bottomSheetRef.current?.expand(), // Encaminhando o método corretamente
    }));

    const handleSheetChanges = useCallback((index: number) => {
      console.log('BottomSheet changed to index:', index);
    }, []);

    const getSnapPointFromOptions = (options: BottomSheetOption[]): string => {
      const percentPerOption = 10;
      const maxPercent = 70;
      const calculated = options.length * percentPerOption + 20;
      return `${Math.min(calculated, maxPercent)}%`;
    };

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      []
    );

    useEffect(() => {
      if (currentScreen === 'search' && notes) { // Check if notes exists
        const results = notes.filter(note =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        onFilterResults(results);
      } else {
        onFilterResults([]); // Fallback when notes is undefined
      }
    }, [searchQuery, notes]);

    function handleGoToSearch() {
      setCurrentScreen('search');
      setSearchQuery('');
      onFilterResults(notes); // mostra todos ao entrar
    }

    function handleGoBack() {
      setCurrentScreen('options');
      setSearchQuery('');
      onFilterResults(notes);
    }

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[getSnapPointFromOptions(options)]}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: theme.COLORS.LIGHT,
        }}
        handleStyle={{
          backgroundColor: theme.COLORS.DARK_100,
          borderTopLeftRadius: BOTTOM_SHEET_BORDER_RADIUS,
          borderTopRightRadius: BOTTOM_SHEET_BORDER_RADIUS,
        }}
        backgroundStyle={{
          backgroundColor: theme.COLORS.DARK_100,
        }}
        style={{
          marginHorizontal: 10,
          alignSelf: 'center',
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          {currentScreen === 'options' ? (
            <BottomSheetScrollView
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: theme.COLORS.DARK_100,
                gap: 10,
              }}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={option.onPress}
                  style={styles.optionButton}
                >
                  <DefaultIcon name={option.iconName} size={20} />
                  <DefaultText text={option.label} />
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={handleGoToSearch}
                style={styles.optionButton}
              >
                <DefaultIcon name="MagnifyingGlass" size={20} />
                <DefaultText text="Buscar por título" />
              </TouchableOpacity>
            </BottomSheetScrollView>
          ) : (
            <BottomSheetScrollView
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: theme.COLORS.DARK_100,
                gap: 16,
              }}
            >
              <TouchableOpacity
                onPress={handleGoBack}
                style={styles.optionButton}
              >
                <DefaultIcon name="ArrowArcLeft" size={20} />
                <DefaultText text="Voltar" />
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Digite o título..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </BottomSheetScrollView>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: theme.COLORS.DARK_100,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    backgroundColor: theme.COLORS.DARK_100,
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
});

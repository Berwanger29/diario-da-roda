import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type BottomSheetOption = {
  label: string;
  iconName: IconName;
  onPress: () => void;
};

export interface DefaultBottomSheetRefProps {
  expand: () => void;
  close: () => void;
}

interface DefaultBottomSheetProps {
  options: BottomSheetOption[];
}

const BOTTOM_SHEET_BORDER_RADIUS = 13;

export const DefaultBottomSheet = forwardRef<DefaultBottomSheetRefProps, DefaultBottomSheetProps>(
  ({ options }, ref) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('BottomSheet changed to index:', index);
    }, []);

    const getSnapPointFromOptions = (options: BottomSheetOption[]): string => {
      const percentPerOption = 10;
      const maxPercent = 90;
      const calculated = (options.length * percentPerOption) + 3;
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

    // Expor métodos para o componente pai via ref
    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand?.(),
      close: () => bottomSheetRef.current?.close?.(),
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[getSnapPointFromOptions(options)]}
        // snapPoints={["10%"]}
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
          <BottomSheetScrollView
            contentContainerStyle={{
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
          </BottomSheetScrollView>
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
});

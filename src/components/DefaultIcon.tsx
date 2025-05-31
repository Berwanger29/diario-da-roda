import * as PhosphorIcons from 'phosphor-react-native';
import { IconProps } from 'phosphor-react-native';
import { ComponentType } from 'react';
import { IconName } from '../@types/iconName';
import theme from '../theme/theme';


type Props = IconProps & {
  name: IconName;
  color?: keyof typeof theme["COLORS"]
};

export const DefaultIcon = ({ name, color, ...rest }: Props) => {
  const IconComponent = PhosphorIcons[name] as ComponentType<IconProps>;

  if (!IconComponent) return null;

  return <IconComponent
    color={color}
    {...rest} />;
};

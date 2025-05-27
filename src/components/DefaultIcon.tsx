import * as PhosphorIcons from 'phosphor-react-native';
import { IconProps } from 'phosphor-react-native';
import { ComponentType } from 'react';
import { IconName } from '../@types/iconName';


type Props = IconProps & {
  name: IconName;
};

export const DefaultIcon = ({ name, ...rest }: Props) => {
  const IconComponent = PhosphorIcons[name] as ComponentType<IconProps>;

  if (!IconComponent) return null;

  return <IconComponent {...rest} />;
};

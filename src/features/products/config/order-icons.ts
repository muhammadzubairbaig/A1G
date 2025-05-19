/**
 * Icon mappings for bakery products
 * Maps product names to their corresponding image assets
 */
import Bread from '@/assets/images/bread.png';
import Cake from '@/assets/images/cake.png';
import Croissant from '@/assets/images/croissant.png';
import Cupcake from '@/assets/images/cupcake.png';
import Pretzel from '@/assets/images/pretzel.png';
import Muffin from '@/assets/images/muffin.png';
import Pancake from '@/assets/images/pancake.png';
import Waffle from '@/assets/images/waffle.png';
import NoImage from '@/assets/images/no-image.png';

export const icons = {
  Bread,
  Cake,
  Croissant,
  Cupcake,
  Pretzel,
  Muffin,
  Pancake,
  Waffle,
  NoImage,
} as const;

export type ItemType = keyof typeof icons;

export const itemTypes: ItemType[] = Object.keys(icons) as ItemType[];

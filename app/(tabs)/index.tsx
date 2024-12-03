import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { RenderType } from '@/components/controls/const';
import Controls from '@/components/controls/controls';
import FilteringModal from '@/components/filtering-modal/filtering-modal';
import ListItem from '@/components/list-item/list-item';
import Map from '@/components/map/map';
import { USERS } from '@/constants/mocks';

export default function HomeScreen() {
  const [renderType, setRenderType] = useState(RenderType.list);
  const filteringModalRef = useRef<BottomSheetModal>(null);
  const [filterByPosition, setFilterByPosition] = useState<string[]>([]);
  const filteredUsers = filterByPosition.length
    ? USERS.filter(({ position }) => filterByPosition.includes(position))
    : USERS;
  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <Controls renderType={renderType} setRenderType={setRenderType} filteringModalRef={filteringModalRef} />
        {renderType === RenderType.list ? (
          <FlatList
            data={filteredUsers}
            renderItem={({ item: { name, surname, middleName, position, phone, id } }) => (
              <ListItem
                name={name}
                surname={surname}
                middleName={middleName}
                position={position}
                phone={phone}
                id={id}
                key={`${id}${name}${middleName}`}
              />
            )}
          />
        ) : (
          <Map filteredUsers={filteredUsers} />
        )}
      </View>
      <FilteringModal
        filteringModalRef={filteringModalRef}
        setFilterByPosition={setFilterByPosition}
        filterByPosition={filterByPosition}
      />
    </BottomSheetModalProvider>
  );
}

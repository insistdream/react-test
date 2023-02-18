import React from 'react';
import styles from './index.m.less';
import SearchBarComp from './comp/SearchBar';
import DatePicker from './comp/DatePicker';
import StatusBar from './comp/StatusBar';

function Header(props) {
  const {onChangeStatus,onChangeSearch,onChangeDate} = props
  return (
    <div className={styles.header}>
      <SearchBarComp onChangeSearch={onChangeSearch} />
      <DatePicker onChangeDate={onChangeDate}  />
      <StatusBar onChangeStatus={onChangeStatus}  />
    </div>
  );
};

export default React.memo(Header)
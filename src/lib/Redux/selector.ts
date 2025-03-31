import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '.';

export const selectExtensions = (state: RootState) => state.extensions;

export const selectExtensionsMeta = createSelector(
    selectExtensions,
    extensions => ({
        error: extensions.error,
        loading: extensions.loading,
        selectedTab: extensions.selectedTab,
    }),
);

export const selectExtensionData = (_extName?: string) =>
    createSelector(
        [selectExtensions, selectExtensionsMeta],
        (extensions, meta) =>
            !_extName
                ? extensions.data.filter(
                      extension =>
                          meta.selectedTab === 'All' ||
                          (meta.selectedTab === 'Active' &&
                              extension.isActive) ||
                          (meta.selectedTab === 'Inactive' &&
                              !extension.isActive),
                  )
                : extensions.data.filter(_ext => _ext.name === _extName),
    );

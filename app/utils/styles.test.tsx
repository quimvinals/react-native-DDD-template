import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import sinon from 'sinon';

import { assert } from '~/test/utils';

import { enhanceTextStyle, enhanceViewStyle, NamedStyles, stylesheet } from './styles';

describe('styles', () => {
  const imageStyle: ImageStyle = { backgroundColor: '#FEFDFC', margin: 10, padding: 10 };
  const viewStyle: ViewStyle = { backgroundColor: '#FEFDFC', margin: 10, padding: 10 };
  const viewStyleOverride: ViewStyle = {
    padding: 20,
  };
  const viewStyleEnhanced: ViewStyle = {
    backgroundColor: '#FEFDFC',
    margin: 10,
    padding: 20,
  };
  const textStyle: TextStyle = {
    color: '#F0F0F0',
    padding: 10,
  };
  const textStyleOverride: TextStyle = {
    color: '#F0F0F0',
    margin: 10,
  };
  const textStyleEnhanced: TextStyle = {
    color: '#F0F0F0',
    margin: 10,
    padding: 10,
  };

  it('enhanceTextStyle', function () {
    const styles = enhanceTextStyle([textStyle, textStyleOverride]);

    expect(styles).toStrictEqual(textStyleEnhanced);
  });

  it('enhanceViewStyle', function () {
    const styles = enhanceViewStyle([viewStyle, viewStyleOverride]);

    expect(styles).toStrictEqual(viewStyleEnhanced);
  });

  describe('stylesheet', function () {
    const stylesheetCreate = sinon.stub(StyleSheet, 'create');
    const cases: [string, NamedStyles][] = [
      ['view', { view: { viewA: viewStyle } }],
      ['text', { text: { textA: textStyle } }],
      ['image', { image: { imageA: imageStyle } }],
    ];

    afterEach(function () {
      stylesheetCreate.resetHistory();
    });

    afterAll(function () {
      stylesheetCreate.restore();
    });

    it.each(cases)('with %s prop', function (prop, rawStyle) {
      stylesheet(rawStyle);

      assert.calledOnceWithExactly(stylesheetCreate, rawStyle[prop]);
    });

    it('returns the style', function () {
      stylesheetCreate.restore();

      const rawStyles = {
        text: { textA: textStyle },
        view: { viewA: viewStyle },
      };
      const style = stylesheet(rawStyles);

      expect(style).toMatchObject(rawStyles);
    });
  });
});

import { Injectable } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';

import { deepMerge } from '@/modules/core/helpers';

@Injectable()
export class SanitizeService {
  protected config: sanitizeHtml.IOptions = {};

  constructor() {
    this.config = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'code']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['class', 'style', 'height', 'witdth'],
      },
      parser: {
        lowerCaseTags: true,
      },
    };
  }

  sanitize(body: string, options?: sanitizeHtml.IOptions) {
    return sanitizeHtml(body, deepMerge(this.config, options ?? {}, 'replace'));
  }
}
